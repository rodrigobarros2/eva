export interface Action {
  type: 'email' | 'whatsapp' | 'api_request';
  config: {
    template?: string;
    apiUrl?: string;
    method?: string;
    payload?: unknown;
  };
  order: number;
}

export interface Journey {
  id?: string;
  name: string;
  description: string;
  actions: Action[];
  createdAt: Date;
  updatedAt: Date;
}
