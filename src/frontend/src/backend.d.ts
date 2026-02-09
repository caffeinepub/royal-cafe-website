import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    description: string;
    price: string;
}
export interface HomePageContent {
    contactInfo: ContactInfo;
    highlights: Array<Highlight>;
    menuCategories: Array<MenuCategory>;
    testimonials: Array<Testimonial>;
}
export interface MenuCategory {
    name: string;
    items: Array<MenuItem>;
}
export type Highlight = string;
export interface ContactInfo {
    hours: string;
    address: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export type Testimonial = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo | null>;
    getFullHomePageContent(): Promise<HomePageContent>;
    getHighlights(): Promise<Array<Highlight>>;
    getMenuCategories(): Promise<Array<MenuCategory>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateHomePageContent(newContent: HomePageContent): Promise<void>;
}
