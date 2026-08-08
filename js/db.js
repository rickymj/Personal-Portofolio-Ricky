/**
 * Cloud Database & Storage Manager (Supabase + Cloudinary / ImgBB + LocalStorage Fallback)
 * Allows seamless persistence across devices, public viewing, and direct image hosting.
 */

const DB_CONFIG_KEY = 'rmj_portfolio_cloud_config';

const CloudDB = {
  // Default Configuration (Can be customized via Admin Cloud Settings Modal)
  config: {
    supabaseUrl: '',
    supabaseAnonKey: '',
    storageBucket: 'portfolio-images',
    imgbbApiKey: '', // Optional free direct image upload
    cloudinaryCloudName: '', // Optional Cloudinary direct upload
    cloudinaryUploadPreset: ''
  },

  client: null,

  init() {
    this.loadConfig();
    this.initSupabaseClient();
  },

  loadConfig() {
    try {
      const saved = localStorage.getItem(DB_CONFIG_KEY);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read cloud config:', e);
    }
  },

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(DB_CONFIG_KEY, JSON.stringify(this.config));
    this.initSupabaseClient();
    return true;
  },

  initSupabaseClient() {
    if (this.config.supabaseUrl && this.config.supabaseAnonKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.config.supabaseUrl, this.config.supabaseAnonKey);
      } catch (e) {
        console.error('Failed to initialize Supabase client:', e);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  },

  isCloudConnected() {
    return !!(this.client && this.config.supabaseUrl && this.config.supabaseAnonKey);
  },

  // --- IMAGE UPLOAD TO CLOUD ---
  /**
   * Uploads a File to Supabase Storage, ImgBB, or Cloudinary.
   * Returns a permanent public URL.
   */
  async uploadImage(file, folder = 'uploads') {
    if (!file) throw new Error('File tidak ditemukan');

    // 1. If Supabase is connected, upload to Supabase Storage Bucket
    if (this.isCloudConnected()) {
      try {
        const ext = file.name ? file.name.split('.').pop() : 'jpg';
        const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        
        const { data, error } = await this.client.storage
          .from(this.config.storageBucket || 'portfolio-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        // Get public URL
        const { data: publicUrlData } = this.client.storage
          .from(this.config.storageBucket || 'portfolio-images')
          .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
      } catch (err) {
        console.error('Supabase storage upload error:', err);
        // Fallback to next upload method
      }
    }

    // 2. If ImgBB API Key is provided
    if (this.config.imgbbApiKey) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${this.config.imgbbApiKey}`, {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json && json.data && json.data.url) {
          return json.data.url;
        }
      } catch (err) {
        console.error('ImgBB upload error:', err);
      }
    }

    // 3. If Cloudinary Unsigned Preset is provided
    if (this.config.cloudinaryCloudName && this.config.cloudinaryUploadPreset) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.config.cloudinaryUploadPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${this.config.cloudinaryCloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json && json.secure_url) {
          return json.secure_url;
        }
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }

    // 4. Default Local/Base64 Fallback (compressed)
    if (typeof compressImageFile === 'function') {
      return await compressImageFile(file);
    }
    return await readFileAsDataUrl(file);
  },

  // --- CLOUD SYNC FOR DATA ---
  async fetchCloudData(table) {
    if (!this.isCloudConnected()) return null;
    try {
      const { data, error } = await this.client
        .from(table)
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.warn(`Supabase fetch error on ${table}:`, error);
        return null;
      }
      return data;
    } catch (e) {
      console.warn(`Cloud fetch failed for ${table}:`, e);
      return null;
    }
  },

  async saveCloudData(table, items) {
    if (!this.isCloudConnected()) return false;
    try {
      // Upsert full list
      const formattedItems = items.map((item, idx) => ({
        ...item,
        order_index: idx
      }));

      // Delete existing and insert new order
      await this.client.from(table).delete().neq('id', 'placeholder_dummy_none');
      const { error } = await this.client.from(table).insert(formattedItems);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error(`Cloud save failed for ${table}:`, e);
      return false;
    }
  }
};

window.CloudDB = CloudDB;
