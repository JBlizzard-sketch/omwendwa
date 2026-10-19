export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      ai_access_state: {
        Row: {
          id: string
          message: string | null
          paused: boolean
          status: number | null
          updated_at: string
        }
        Insert: {
          id: string
          message?: string | null
          paused?: boolean
          status?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          message?: string | null
          paused?: boolean
          status?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      article_revisions: {
        Row: {
          actor_id: string | null
          article_id: string
          created_at: string
          id: string
          snapshot: Json
          version: number
        }
        Insert: {
          actor_id?: string | null
          article_id: string
          created_at?: string
          id?: string
          snapshot: Json
          version: number
        }
        Update: {
          actor_id?: string | null
          article_id?: string
          created_at?: string
          id?: string
          snapshot?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_revisions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "editorial_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_bookings: {
        Row: {
          assigned_to: string | null
          consent_privacy: boolean
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          mode: string
          name: string
          phone: string | null
          practice_area: string
          reference: string
          slot_date: string
          slot_time: string
          staff_notes: string
          status: string
          summary: string
          urgency: string | null
        }
        Insert: {
          assigned_to?: string | null
          consent_privacy?: boolean
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          mode?: string
          name: string
          phone?: string | null
          practice_area: string
          reference: string
          slot_date: string
          slot_time: string
          staff_notes?: string
          status?: string
          summary: string
          urgency?: string | null
        }
        Update: {
          assigned_to?: string | null
          consent_privacy?: boolean
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          mode?: string
          name?: string
          phone?: string | null
          practice_area?: string
          reference?: string
          slot_date?: string
          slot_time?: string
          staff_notes?: string
          status?: string
          summary?: string
          urgency?: string | null
        }
        Relationships: []
      }
      editorial_articles: {
        Row: {
          author_name: string
          category: string
          content: string
          created_by: string | null
          excerpt: string
          id: string
          meta_description: string
          publish_at: string | null
          published_at: string | null
          review_notes: string
          slug: string
          status: string
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          author_name?: string
          category?: string
          content?: string
          created_by?: string | null
          excerpt?: string
          id?: string
          meta_description?: string
          publish_at?: string | null
          published_at?: string | null
          review_notes?: string
          slug: string
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_by?: string | null
          excerpt?: string
          id?: string
          meta_description?: string
          publish_at?: string | null
          published_at?: string | null
          review_notes?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          assigned_to: string | null
          consent_privacy: boolean
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          message: string
          name: string
          phone: string | null
          practice_area: string | null
          source: string
          staff_notes: string
          status: string
          urgency: string | null
        }
        Insert: {
          assigned_to?: string | null
          consent_privacy?: boolean
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          message: string
          name: string
          phone?: string | null
          practice_area?: string | null
          source?: string
          staff_notes?: string
          status?: string
          urgency?: string | null
        }
        Update: {
          assigned_to?: string | null
          consent_privacy?: boolean
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          message?: string
          name?: string
          phone?: string | null
          practice_area?: string | null
          source?: string
          staff_notes?: string
          status?: string
          urgency?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          consent_at: string
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          status: string
        }
        Insert: {
          consent_at?: string
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          status?: string
        }
        Update: {
          consent_at?: string
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          notification_preferences: Json
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id: string
          notification_preferences?: Json
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          notification_preferences?: Json
        }
        Relationships: []
      }
      published_articles: {
        Row: {
          archived: boolean
          author_name: string
          category: string
          content: string
          excerpt: string
          id: string
          meta_description: string
          published_at: string
          slug: string
          title: string
          updated_at: string
          visible_at: string
        }
        Insert: {
          archived?: boolean
          author_name: string
          category: string
          content: string
          excerpt: string
          id: string
          meta_description: string
          published_at: string
          slug: string
          title: string
          updated_at: string
          visible_at: string
        }
        Update: {
          archived?: boolean
          author_name?: string
          category?: string
          content?: string
          excerpt?: string
          id?: string
          meta_description?: string
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
          visible_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "published_articles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "editorial_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_activity: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          record_id: string
          record_type: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id: string
          record_type: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id?: string
          record_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_taken_slots: {
        Args: { _from: string; _to: string }
        Returns: {
          slot_date: string
          slot_time: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "assistant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "assistant"],
    },
  },
} as const
