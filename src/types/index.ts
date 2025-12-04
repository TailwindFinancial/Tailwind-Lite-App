/**
 * Type Definitions - Central Type System
 * 
 * This file contains all TypeScript interfaces and types used throughout the Tailwind app.
 * It provides type safety and autocompletion for data structures, API responses, and navigation.
 * 
 * Categories:
 * - User & Authentication: User accounts and auth credentials
 * - Pot Management: Pot entities and their relationships
 * - Expenses: Expense tracking and splitting
 * - Settlements: Balance calculations and debt settlements
 * - Currency: Multi-currency support
 * - Navigation: React Navigation type definitions
 * - API: HTTP request/response types
 * 
 * @module Types
 */

// ============================================================================
// User & Authentication Types
// ============================================================================

/**
 * User account information
 * Represents a registered user in the Tailwind system
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  
  /** User's email address (used for login) */
  email: string;
  
  /** User's display name */
  name: string;
  
  /** Optional profile photo URL */
  avatarUrl?: string;
  
  /** User's preferred currency (ISO 4217 code, e.g., "USD", "EUR") */
  preferredCurrency: string;
  
  /** ISO 8601 timestamp of account creation */
  createdAt: string;
  
  /** ISO 8601 timestamp of last profile update */
  updatedAt: string;
}

/**
 * Login credentials
 * Used for authenticating existing users
 */
export interface AuthCredentials {
  /** User's email address */
  email: string;
  
  /** User's password (plain text, will be encrypted in transit) */
  password: string;
}

/**
 * Registration data
 * Contains all information needed to create a new account
 */
export interface RegisterData {
  /** User's email address */
  email: string;
  
  /** User's chosen password */
  password: string;
  
  /** User's display name */
  name: string;
  
  /** Optional: User's preferred currency (defaults to USD) */
  preferredCurrency?: string;
}

/**
 * Authentication response from API
 * Returned after successful login or registration
 */
export interface AuthResponse {
  /** User account information */
  user: User;
  
  /** JWT authentication token (Bearer token) */
  token: string;
  
  /** Optional: Refresh token for maintaining long sessions */
  refreshToken?: string;
}

// ============================================================================
// Pot Management Types
// ============================================================================

/**
 * Pot (shared expense group)
 * Represents a group of people sharing expenses (e.g., a trip, household, event)
 */
export interface Pot {
  /** Unique identifier for the pot */
  id: string;
  
  /** Display name for the pot (e.g., "Bali Trip 2024") */
  name: string;
  
  /** Optional description or notes */
  description?: string;
  
  /** User ID of the pot creator (has admin rights) */
  createdBy: string;
  
  /** Array of user IDs who are members of this pot */
  memberIds: string[];
  
  /** Array of full member objects (populated from memberIds) */
  members: User[];
  
  /** Base currency for the pot (ISO 4217 code) */
  currency: string;
  
  /** Optional cover image URL */
  coverImageUrl?: string;
  
  /** Whether the pot is archived (read-only) */
  isArchived: boolean;
  
  /** ISO 8601 timestamp of pot creation */
  createdAt: string;
  
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
  
  /** Optional: End date for the pot (e.g., trip end date) */
  endDate?: string;
}

/**
 * Pot creation data
 * Required information to create a new pot
 */
export interface CreatePotData {
  /** Name for the new pot */
  name: string;
  
  /** Optional description */
  description?: string;
  
  /** Currency code (defaults to user's preferred currency) */
  currency?: string;
  
  /** Optional array of user IDs to invite as members */
  memberIds?: string[];
}

// ============================================================================
// Expense Types
// ============================================================================

/**
 * Expense entry
 * Represents a single expense within a pot
 */
export interface Expense {
  /** Unique identifier for the expense */
  id: string;
  
  /** ID of the pot this expense belongs to */
  potId: string;
  
  /** User ID of who paid for the expense */
  paidBy: string;
  
  /** Full user object of who paid (populated from paidBy) */
  paidByUser: User;
  
  /** Total amount of the expense (in the expense's currency) */
  amount: number;
  
  /** Currency of the expense (ISO 4217 code) */
  currency: string;
  
  /** Brief description of the expense */
  description: string;
  
  /** Optional category (e.g., "Food", "Transport", "Accommodation") */
  category?: string;
  
  /** Array defining how the expense is split among members */
  splits: ExpenseSplit[];
  
  /** Optional: URL to receipt image */
  receiptImageUrl?: string;
  
  /** Optional: Date when the expense occurred (defaults to createdAt) */
  date?: string;
  
  /** Optional: Geographic location of the expense */
  location?: string;
  
  /** Optional: AI-generated roast comment about the expense */
  roastComment?: string;
  
  /** ISO 8601 timestamp of expense creation */
  createdAt: string;
  
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Expense split definition
 * Defines how much each member owes for an expense
 */
export interface ExpenseSplit {
  /** User ID of the member who owes this split */
  userId: string;
  
  /** Amount this member owes (in the expense's currency) */
  amount: number;
  
  /** Whether this split is an equal share (true) or custom amount (false) */
  isEqualSplit: boolean;
  
  /** Optional: Percentage of total (0-100) for percentage-based splits */
  percentage?: number;
}

/**
 * Expense creation data
 * Information needed to create a new expense
 */
export interface CreateExpenseData {
  /** ID of the pot to add the expense to */
  potId: string;
  
  /** User ID of who paid */
  paidBy: string;
  
  /** Total amount paid */
  amount: number;
  
  /** Currency code (defaults to pot's currency) */
  currency?: string;
  
  /** Expense description */
  description: string;
  
  /** Optional category */
  category?: string;
  
  /** Array of splits (must sum to total amount) */
  splits: Omit<ExpenseSplit, 'userId'>[] | 'equal';
  
  /** Optional receipt image */
  receiptImage?: string; // Base64 or URL
  
  /** Optional date */
  date?: string;
  
  /** Optional location */
  location?: string;
}

// ============================================================================
// Settlement Types
// ============================================================================

/**
 * Member balance in a pot
 * Represents how much a member owes or is owed in a pot
 */
export interface Balance {
  /** User ID */
  userId: string;
  
  /** Full user object (populated from userId) */
  user: User;
  
  /** Balance amount (positive = owed, negative = owes) */
  amount: number;
  
  /** Currency of the balance (pot's currency) */
  currency: string;
}

/**
 * Simplified debt between two members
 * Represents a direct payment that should be made
 */
export interface Debt {
  /** User ID of who owes money */
  fromUserId: string;
  
  /** User object of who owes money */
  fromUser: User;
  
  /** User ID of who is owed money */
  toUserId: string;
  
  /** User object of who is owed money */
  toUser: User;
  
  /** Amount to be paid */
  amount: number;
  
  /** Currency of the debt */
  currency: string;
}

/**
 * Settlement record
 * Tracks when a debt was paid off
 */
export interface Settlement {
  /** Unique identifier for the settlement */
  id: string;
  
  /** ID of the pot this settlement belongs to */
  potId: string;
  
  /** User ID of who paid */
  fromUserId: string;
  
  /** User ID of who received payment */
  toUserId: string;
  
  /** Amount paid */
  amount: number;
  
  /** Currency of the payment */
  currency: string;
  
  /** Optional payment method (e.g., "Venmo", "Cash", "Bank Transfer") */
  paymentMethod?: string;
  
  /** Optional payment confirmation ID/receipt */
  confirmationId?: string;
  
  /** Optional notes */
  notes?: string;
  
  /** ISO 8601 timestamp of settlement */
  createdAt: string;
}

// ============================================================================
// Currency Types
// ============================================================================

/**
 * Currency conversion rate
 * Exchange rate between two currencies
 */
export interface CurrencyConversion {
  /** Source currency code */
  from: string;
  
  /** Target currency code */
  to: string;
  
  /** Conversion rate (multiply amount by this to convert) */
  rate: number;
  
  /** ISO 8601 timestamp of when rate was fetched */
  timestamp: string;
}

// ============================================================================
// Special Features Types
// ============================================================================

/**
 * Trip Wrapped statistics
 * Year-in-review style statistics for a pot
 */
export interface TripWrapped {
  /** ID of the pot these stats are for */
  potId: string;
  
  /** Total amount spent in the pot */
  totalSpent: number;
  
  /** Currency of totals */
  currency: string;
  
  /** Number of expenses recorded */
  expenseCount: number;
  
  /** Number of days the pot was active */
  tripDuration: number;
  
  /** User who spent the most */
  biggestSpender: User;
  
  /** Amount the biggest spender spent */
  biggestSpenderAmount: number;
  
  /** Most expensive single expense */
  biggestExpense: Expense;
  
  /** Most common expense category */
  topCategory: string;
  
  /** Average expense amount */
  averageExpense: number;
  
  /** Array of category breakdowns */
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    count: number;
  }>;
  
  /** Optional: Fun facts and insights */
  insights?: string[];
}

/**
 * OCR scan result
 * Data extracted from a receipt image
 */
export interface OcrResult {
  /** Total amount detected on receipt */
  amount: number;
  
  /** Currency detected (may be null if not detected) */
  currency?: string;
  
  /** Merchant name detected */
  merchantName?: string;
  
  /** Date detected on receipt */
  date?: string;
  
  /** Array of line items detected */
  items?: Array<{
    name: string;
    price: number;
  }>;
  
  /** Confidence score (0-1) */
  confidence: number;
  
  /** Raw OCR text */
  rawText: string;
}

// ============================================================================
// API Types
// ============================================================================

/**
 * Generic API error response
 * Standardized error format from the backend
 */
export interface ApiError {
  /** Error message for display */
  message: string;
  
  /** HTTP status code */
  statusCode: number;
  
  /** Machine-readable error code */
  code?: string;
  
  /** Field-specific validation errors */
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Generic API success response
 * Wraps successful API responses
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  
  /** Success message */
  message?: string;
  
  /** Additional metadata */
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Auth Navigator parameters
 * Defines screens in the authentication flow
 */
export type AuthStackParamList = {
  /** Welcome/Onboarding screen (no params) */
  Welcome: undefined;
  
  /** Login screen (no params) */
  Login: undefined;
  
  /** Registration screen (no params) */
  Register: undefined;
  
  /** Forgot password screen (no params) */
  ForgotPassword: undefined;
};

/**
 * Pot Stack Navigator parameters
 * Defines screens in the pot management flow
 */
export type PotStackParamList = {
  /** List of all pots (no params) */
  PotList: undefined;
  
  /** Pot detail screen */
  PotDetail: {
    /** ID of the pot to display */
    potId: string;
  };
  
  /** Create new pot screen (no params) */
  CreatePot: undefined;
  
  /** Pot settings screen */
  PotSettings: {
    /** ID of the pot to edit */
    potId: string;
  };
  
  /** Expense detail screen */
  ExpenseDetail: {
    /** ID of the pot */
    potId: string;
    /** ID of the expense to display */
    expenseId: string;
  };
  
  /** Receipt scanning screen */
  ScanReceipt: {
    /** ID of the pot to add expense to */
    potId: string;
  };
  
  /** Trip Wrapped screen */
  TripWrapped: {
    /** ID of the pot to generate stats for */
    potId: string;
  };
  
  /** Settle up screen */
  SettleUp: {
    /** ID of the pot */
    potId: string;
  };
};

/**
 * Main Tab Navigator parameters
 * Defines the main bottom tab screens
 */
export type MainTabParamList = {
  /** Home/Dashboard screen (no params) */
  Home: undefined;
  
  /** Trips (Pots) navigator (nested stack) */
  Trips: undefined;
  
  /** Messages/Activity feed screen (no params) */
  Messages: undefined;
  
  /** Move Money/Settle up screen (no params) */
  MoveMoney: undefined;
  
  /** More/Settings screen (no params) */
  More: undefined;
};

/**
 * Root navigator parameters
 * Top-level navigation structure
 */
export type RootStackParamList = {
  /** Auth flow (nested stack) */
  Auth: undefined;
  
  /** Main app (nested tabs) */
  Main: undefined;
};


