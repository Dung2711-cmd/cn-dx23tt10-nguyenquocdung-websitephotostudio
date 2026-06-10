export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type UserRole = "admin" | "customer";

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string;
          booking_time: string;
          created_at: string;
          customer_id: number;
          id: number;
          note: string | null;
          service_id: number;
          status: string;
        };
        Insert: {
          booking_date: string;
          booking_time: string;
          created_at?: string;
          customer_id: number;
          id?: number;
          note?: string | null;
          service_id: number;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      contracts: {
        Row: {
          booking_id: number;
          created_at: string;
          id: number;
          signed_at: string | null;
          status: string;
          total_price: number;
        };
        Insert: {
          booking_id: number;
          created_at?: string;
          id?: number;
          signed_at?: string | null;
          status?: string;
          total_price: number;
        };
        Update: Partial<Database["public"]["Tables"]["contracts"]["Insert"]>;
      };
      customers: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          full_name: string;
          id: number;
          phone: string | null;
          user_id: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          full_name: string;
          id?: number;
          phone?: string | null;
          user_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      payments: {
        Row: {
          amount: number;
          contract_id: number;
          created_at: string;
          id: number;
          payment_date: string | null;
          payment_method: string;
          status: string;
        };
        Insert: {
          amount: number;
          contract_id: number;
          created_at?: string;
          id?: number;
          payment_date?: string | null;
          payment_method: string;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
      services: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image_url: string | null;
          is_active: boolean;
          name: string;
          price: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          is_active?: boolean;
          name: string;
          price: number;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      admin_assignments: {
        Row: {
          assigned_at: string;
          admin_id: string;
          booking_id: number;
          id: number;
          task_role: string;
        };
        Insert: {
          admin_id: string;
          assigned_at?: string;
          booking_id: number;
          id?: number;
          task_role: string;
        };
        Update: Partial<Database["public"]["Tables"]["admin_assignments"]["Insert"]>;
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          role: UserRole;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          role?: UserRole;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
