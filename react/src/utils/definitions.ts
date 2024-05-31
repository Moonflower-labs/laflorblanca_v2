export interface User {
  id: string | number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  membership?: Membership;
  likes: {
    liked_comments: number[] | null;
    liked_posts: number[] | null;
    liked_videos: number[] | null;
  };
  profile: userProfile | null;
}

export interface Membership {
  status:
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid"
    | "paused";
  plan: {
    name: string;
    price_id: string;
  };
  subscription_id: string;
}

interface userProfile {
  id: number;
  user: number;
  favorite_posts: number[] | string[] | null;
  favorite_videos: number[] | null;
}

export interface Like {
  id: number;
  user: number;
  post?: Post;
  video?: VideoLink;
  comment?: Comment;
}

export interface Comment {
  id: number;
  user: number;
  text: string;
  likes: Like[] | null;
  created: Date;
}

export interface Post {
  id: string | number | undefined;
  author: string;
  created: Date;
  title: string;
  body: string;
  rating_score: { score: number; votes: number; authors: number[] };
  category?: string;
  comments?: Comment[] | null;
  likes?: number[] | null;
}

export type CartProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  amount: number;
  quantity: number;
};
export interface ProductItem {
  product: {
    id: string;
    name: string;
    description: string;
    images: string[];
    type: string;
  };
  prices: Price[];
}
export interface Price {
  active: string;

  created?: string;
  currency: string;
  id: string;
  metadata?: {
    title?: string;
    color?: string;
    size?: string;
  };
  product: string;
  unit_amount: number;
}
export interface CartItemPrice {
  id: string;
  amount: number;
}
export type PostItemProps = {
  post: Post | null;
  user: User | null;
};

export interface Errors {
  name?: string;
  age_group?: string;
  subject?: string;
  text?: string;
  info?: string;
}

export interface VideoLink {
  id: number | string;
  section: string;
  url: string;
  uploaded_on: Date;
  title: string;
  description: string;
  category?: string;
  comments?: Comment[] | null;
  likes: Like[] | null;
}

export type DRFResponse = {
  count: number;
  total_pages: number;
  results: (Post | VideoLink | Comment)[];
};

export type LkeButtonProps = {
  object: string;
  id: number;
  isLiked: boolean;
};

export type CommentProps = {
  comment: Comment;
};

export type CommentFormProps = {
  object: Post | VideoLink;
  fieldName: string;
};

export interface PaymentIntent {
  amount: number,
  amount_details: {
    tip: string | number;
  };
  automatic_payment_methods: {
    allow_redirects: string;
    enabled: true;
  };
  canceled_at: null;
  cancellation_reason: string | null;
  capture_method: string;
  client_secret:string;
  confirmation_method: string;
  created: number;
  currency: string;
  description: string | null;
  id: string;
  last_payment_error:string | null;
  livemode: boolean;
  next_action: null;
  object: string;
  payment_method: string;
  payment_method_configuration_details: {
    id: string;
    parent: null;
  };
  payment_method_types: string [];
  processing: null;
  receipt_email: null;
  setup_future_usage: null;
  shipping?: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    carrier: null; 
    name: string;
    phone: string;
    tracking_number: null
  };
  source: null;
  status: string;
}