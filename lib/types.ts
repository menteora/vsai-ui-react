
import React from 'react';

export type Theme = 'light' | 'dark';

export interface ToolbarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'danger' | 'ghost';
}

export interface TablePagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentDocs {
  name: string;
  description: string;
  props: PropDefinition[];
  /** Codice di setup (es. hook) da mostrare prima del componente nella guida. */
  prelude?: string;
  /** Valori di esempio da usare nello snippet JSX (possono essere stringhe template come "{value}"). */
  exampleProps?: Record<string, any>;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
