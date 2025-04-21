import { D1Database } from '@cloudflare/workers-types';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'traveler' | 'agency' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Agency {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  location: string;
  logo_url?: string;
  cover_image_url?: string;
  rating: number;
  reviews_count: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  description?: string;
  long_description?: string;
  continent: string;
  country: string;
  image_url?: string;
  climate?: string;
  best_time_to_visit?: string;
  languages?: string;
  currency?: string;
  recommended_duration?: string;
  created_at: string;
  updated_at: string;
}

export interface DestinationHighlight {
  id: number;
  destination_id: number;
  highlight: string;
}

export interface Theme {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Itinerary {
  id: number;
  agency_id: number;
  destination_id: number;
  title: string;
  description?: string;
  duration: string;
  price_from: number;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: number;
  user_id: number;
  destination_id: number;
  departure_date?: string;
  duration?: string;
  travelers_count: number;
  budget?: number;
  accommodation_type?: string;
  message?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: number;
  quote_request_id: number;
  agency_id: number;
  price: number;
  description?: string;
  validity_period: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  quote_id: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'partial' | 'completed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
}

export interface Conversation {
  id: number;
  traveler_id: number;
  agency_id: number;
  quote_request_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Review {
  id: number;
  user_id: number;
  agency_id: number;
  booking_id?: number;
  rating: number;
  title?: string;
  content?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface SearchPreference {
  id: number;
  user_id: number;
  preferred_destinations?: string;
  preferred_themes?: string;
  preferred_duration?: string;
  preferred_budget_min?: number;
  preferred_budget_max?: number;
  preferred_accommodation_types?: string;
  created_at: string;
  updated_at: string;
}

export interface SearchHistory {
  id: number;
  user_id?: number;
  search_query: string;
  filters?: string;
  created_at: string;
}

export interface DB {
  db: D1Database;
}

export class DatabaseService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  // User methods
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Users (email, password_hash, first_name, last_name, phone, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      user.email,
      user.password_hash,
      user.first_name,
      user.last_name,
      user.phone || null,
      user.role
    ).run();

    return result.meta.last_row_id as number;
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Users WHERE id = ?
    `).bind(id).first<User>();

    return result || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Users WHERE email = ?
    `).bind(email).first<User>();

    return result || null;
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const fields = Object.keys(user).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => (user as any)[field]);

    const result = await this.db.prepare(`
      UPDATE Users
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(...values, id).run();

    return result.success;
  }

  // Destination methods
  async getAllDestinations(): Promise<Destination[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Destinations ORDER BY name
    `).all<Destination>();

    return result.results;
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Destinations WHERE slug = ?
    `).bind(slug).first<Destination>();

    return result || null;
  }

  async getDestinationById(id: number): Promise<Destination | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Destinations WHERE id = ?
    `).bind(id).first<Destination>();

    return result || null;
  }

  async getDestinationHighlights(destinationId: number): Promise<DestinationHighlight[]> {
    const result = await this.db.prepare(`
      SELECT * FROM DestinationHighlights WHERE destination_id = ?
    `).bind(destinationId).all<DestinationHighlight>();

    return result.results;
  }

  async searchDestinations(query: string): Promise<Destination[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Destinations 
      WHERE name LIKE ? OR country LIKE ? OR continent LIKE ?
      ORDER BY name
    `).bind(`%${query}%`, `%${query}%`, `%${query}%`).all<Destination>();

    return result.results;
  }

  async filterDestinations(continent?: string, theme?: string): Promise<Destination[]> {
    let sql = `SELECT DISTINCT d.* FROM Destinations d`;
    const params: any[] = [];

    if (theme) {
      sql += ` 
        JOIN Itineraries i ON d.id = i.destination_id
        JOIN ItineraryThemes it ON i.id = it.itinerary_id
        JOIN Themes t ON it.theme_id = t.id
      `;
    }

    sql += ` WHERE 1=1`;

    if (continent) {
      sql += ` AND d.continent = ?`;
      params.push(continent);
    }

    if (theme) {
      sql += ` AND t.slug = ?`;
      params.push(theme);
    }

    sql += ` ORDER BY d.name`;

    const result = await this.db.prepare(sql).bind(...params).all<Destination>();
    return result.results;
  }

  // Theme methods
  async getAllThemes(): Promise<Theme[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Themes ORDER BY name
    `).all<Theme>();

    return result.results;
  }

  async getThemeBySlug(slug: string): Promise<Theme | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Themes WHERE slug = ?
    `).bind(slug).first<Theme>();

    return result || null;
  }

  // Agency methods
  async getAgenciesByDestination(destinationId: number): Promise<Agency[]> {
    const result = await this.db.prepare(`
      SELECT a.* FROM Agencies a
      JOIN AgencyDestinations ad ON a.id = ad.agency_id
      WHERE ad.destination_id = ?
      ORDER BY a.rating DESC
    `).bind(destinationId).all<Agency>();

    return result.results;
  }

  async getAgencyById(id: number): Promise<Agency | null> {
    const result = await this.db.prepare(`
      SELECT * FROM Agencies WHERE id = ?
    `).bind(id).first<Agency>();

    return result || null;
  }

  // Itinerary methods
  async getItinerariesByDestination(destinationId: number): Promise<Itinerary[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Itineraries 
      WHERE destination_id = ?
      ORDER BY is_featured DESC, price_from ASC
    `).bind(destinationId).all<Itinerary>();

    return result.results;
  }

  // Quote Request methods
  async createQuoteRequest(quoteRequest: Omit<QuoteRequest, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO QuoteRequests (
        user_id, destination_id, departure_date, duration, 
        travelers_count, budget, accommodation_type, message, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      quoteRequest.user_id,
      quoteRequest.destination_id,
      quoteRequest.departure_date || null,
      quoteRequest.duration || null,
      quoteRequest.travelers_count,
      quoteRequest.budget || null,
      quoteRequest.accommodation_type || null,
      quoteRequest.message || null,
      quoteRequest.status
    ).run();

    return result.meta.last_row_id as number;
  }

  async getQuoteRequestsByUser(userId: number): Promise<QuoteRequest[]> {
    const result = await this.db.prepare(`
      SELECT * FROM QuoteRequests 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(userId).all<QuoteRequest>();

    return result.results;
  }

  // Quote methods
  async createQuote(quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Quotes (
        quote_request_id, agency_id, price, description, validity_period, status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      quote.quote_request_id,
      quote.agency_id,
      quote.price,
      quote.description || null,
      quote.validity_period,
      quote.status
    ).run();

    return result.meta.last_row_id as number;
  }

  async getQuotesByQuoteRequest(quoteRequestId: number): Promise<Quote[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Quotes 
      WHERE quote_request_id = ?
      ORDER BY created_at DESC
    `).bind(quoteRequestId).all<Quote>();

    return result.results;
  }

  // Booking methods
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Bookings (
        user_id, quote_id, total_price, status, payment_status
      )
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      booking.user_id,
      booking.quote_id,
      booking.total_price,
      booking.status,
      booking.payment_status
    ).run();

    return result.meta.last_row_id as number;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Bookings 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(userId).all<Booking>();

    return result.results;
  }

  // Conversation methods
  async createConversation(conversation: Omit<Conversation, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Conversations (
        traveler_id, agency_id, quote_request_id
      )
      VALUES (?, ?, ?)
    `).bind(
      conversation.traveler_id,
      conversation.agency_id,
      conversation.quote_request_id || null
    ).run();

    return result.meta.last_row_id as number;
  }

  async getConversationsByUser(userId: number): Promise<Conversation[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Conversations 
      WHERE traveler_id = ? OR agency_id IN (
        SELECT id FROM Agencies WHERE user_id = ?
      )
      ORDER BY updated_at DESC
    `).bind(userId, userId).all<Conversation>();

    return result.results;
  }

  // Message methods
  async createMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Messages (
        conversation_id, sender_id, content, is_read
      )
      VALUES (?, ?, ?, ?)
    `).bind(
      message.conversation_id,
      message.sender_id,
      message.content,
      message.is_read
    ).run();

    // Update conversation updated_at
    await this.db.prepare(`
      UPDATE Conversations
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(message.conversation_id).run();

    return result.meta.last_row_id as number;
  }

  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Messages 
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `).bind(conversationId).all<Message>();

    return result.results;
  }

  // Review methods
  async createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO Reviews (
        user_id, agency_id, booking_id, rating, title, content, is_verified
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      review.user_id,
      review.agency_id,
      review.booking_id || null,
      review.rating,
      review.title || null,
      review.content || null,
      review.is_verified
    ).run();

    // Update agency rating
    await this.updateAgencyRating(review.agency_id);

    return result.meta.last_row_id as number;
  }

  async getReviewsByAgency(agencyId: number): Promise<Review[]> {
    const result = await this.db.prepare(`
      SELECT * FROM Reviews 
      WHERE agency_id = ?
      ORDER BY created_at DESC
    `).bind(agencyId).all<Review>();

    return result.results;
  }

  private async updateAgencyRating(agencyId: number): Promise<void> {
    // Calculate new average rating
    const ratingResult = await this.db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count
      FROM Reviews
      WHERE agency_id = ?
    `).bind(agencyId).first<{ avg_rating: number, count: number }>();

    if (ratingResult) {
      await this.db.prepare(`
        UPDATE Agencies
        SET rating = ?, reviews_count = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        ratingResult.avg_rating || 0,
        ratingResult.count || 0,
        agencyId
      ).run();
    }
  }

  // Search methods
  async saveSearchHistory(search: Omit<SearchHistory, 'id' | 'created_at'>): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO SearchHistory (
        user_id, search_query, filters
      )
      VALUES (?, ?, ?)
    `).bind(
      search.user_id || null,
      search.search_query,
      search.filters || null
    ).run();

    return result.meta.last_row_id as number;
  }

  async getSearchHistoryByUser(userId: number, limit: number = 10): Promise<SearchHistory[]> {
    const result = await this.db.prepare(`
      SELECT * FROM SearchHistory 
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(userId, limit).all<SearchHistory>();

    return result.results;
  }

  async updateSearchPreferences(userId: number, preferences: Partial<SearchPreference>): Promise<boolean> {
    // Check if preferences exist
    const existingPrefs = await this.db.prepare(`
      SELECT id FROM SearchPreferences WHERE user_id = ?
    `).bind(userId).first<{ id: number }>();

    if (existingPrefs) {
      // Update existing preferences
      const fields = Object.keys(preferences).filter(key => 
        key !== 'id' && key !== 'user_id' && key !== 'created_at' && key !== 'updated_at'
      );
      
      if (fields.length === 0) return false;

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const values = fields.map(field => (preferences as any)[field]);

      const result = await this.db.prepare(`
        UPDATE SearchPreferences
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).bind(...values, userId).run();

      return result.success;
    } else {
      // Create new preferences
      const result = await this.db.prepare(`
        INSERT INTO SearchPreferences (
          user_id, preferred_destinations, preferred_themes, preferred_duration,
          preferred_budget_min, preferred_budget_max, preferred_accommodation_types
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        userId,
        preferences.preferred_destinations || null,
        preferences.preferred_themes || null,
        preferences.preferred_duration || null,
        preferences.preferred_budget_min || null,
        preferences.preferred_budget_max || null,
        preferences.preferred_accommodation_types || null
      ).run();

      return result.success;
    }
  }

  async getSearchPreferences(userId: number): Promise<SearchPreference | null> {
    const result = await this.db.prepare(`
      SELECT * FROM SearchPreferences WHERE user_id = ?
    `).bind(userId).first<SearchPreference>();

    return result || null;
  }

  // Advanced search
  async advancedSearch(params: {
    query?: string;
    continent?: string;
    theme?: string;
    budget_min?: number;
    budget_max?: number;
    duration?: string;
  }): Promise<Destination[]> {
    let sql = `
      SELECT DISTINCT d.* FROM Destinations d
    `;
    
    const conditions: string[] = [];
    const values: any[] = [];

    // Join tables if needed
    if (params.theme) {
      sql += `
        JOIN Itineraries i ON d.id = i.destination_id
        JOIN ItineraryThemes it ON i.id = it.itinerary_id
        JOIN Themes t ON it.theme_id = t.id
      `;
    }

    if (params.budget_min || params.budget_max) {
      if (!sql.includes('JOIN Itineraries i')) {
        sql += ` JOIN Itineraries i ON d.id = i.destination_id`;
      }
    }

    // Add conditions
    if (params.query) {
      conditions.push(`(d.name LIKE ? OR d.country LIKE ? OR d.continent LIKE ?)`);
      values.push(`%${params.query}%`, `%${params.query}%`, `%${params.query}%`);
    }

    if (params.continent) {
      conditions.push(`d.continent = ?`);
      values.push(params.continent);
    }

    if (params.theme) {
      conditions.push(`t.slug = ?`);
      values.push(params.theme);
    }

    if (params.budget_min) {
      conditions.push(`i.price_from >= ?`);
      values.push(params.budget_min);
    }

    if (params.budget_max) {
      conditions.push(`i.price_from <= ?`);
      values.push(params.budget_max);
    }

    if (params.duration) {
      // This is a simplification - in a real app, you'd need to parse the duration format
      conditions.push(`i.duration LIKE ?`);
      values.push(`%${params.duration}%`);
    }

    // Add WHERE clause if there are conditions
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY d.name`;

    const result = await this.db.prepare(sql).bind(...values).all<Destination>();
    return result.results;
  }
}
