import api from '../src/configs/axios';

type OrderOpts = { ascending?: boolean };

class TableQuery {
  private filters: Record<string, any> = {};
  private search: { column: string; value: string } | null = null;
  private orderBy: { column: string; ascending: boolean } | null = null;

  constructor(private table: string) {}

  eq(column: string, value: any) {
    this.filters[column] = value;
    return this;
  }

  ilike(column: string, value: string) {
    this.search = { column, value: value.replace(/%/g, '').toLowerCase() };
    return this;
  }

  order(column: string, opts: OrderOpts = {}) {
    this.orderBy = { column, ascending: opts.ascending ?? true };
    return this;
  }

  async select(_columns?: string) {
    try {
      const { data } = await api.get(`/${this.table}`);
      let rows: any[] = data?.data ?? data ?? [];

      // filtros simples
      rows = rows.filter((row) =>
        Object.entries(this.filters).every(([col, val]) => row[col] === val),
      );

      if (this.search) {
        rows = rows.filter((row) => {
          const v = (row[this.search!.column] ?? '').toString().toLowerCase();
          return v.includes(this.search!.value);
        });
      }

      if (this.orderBy) {
        rows = rows.sort((a, b) => {
          const va = a[this.orderBy!.column];
          const vb = b[this.orderBy!.column];
          if (va === vb) return 0;
          return (va > vb ? 1 : -1) * (this.orderBy!.ascending ? 1 : -1);
        });
      }

      return { data: rows, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }

  async single() {
    const res = await this.select();
    if (res.data && Array.isArray(res.data)) {
      return { data: res.data[0] ?? null, error: res.error };
    }
    return res;
  }

  async maybeSingle() {
    return this.single();
  }

  async insert(rows: any[]) {
    try {
      const { data } = await api.post(`/${this.table}`, rows);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }

  async update(values: any) {
    try {
      const id = this.filters['id'];
      const { data } = await api.put(
        id ? `/${this.table}/${id}` : `/${this.table}`,
        values,
      );
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }

  async delete() {
    try {
      const id = this.filters['id'];
      const { data } = await api.delete(
        id ? `/${this.table}/${id}` : `/${this.table}`,
      );
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }
}

const supabase = {
  from(table: string) {
    return new TableQuery(table);
  },
  auth: {
    async signInWithPassword({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      try {
        const { data } = await api.post('/login', { email, password });
        return { data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    async signOut() {
      try {
        await api.post('/logout');
        return { error: null };
      } catch (error: any) {
        return { error };
      }
    },
    async getSession() {
      // não há endpoint dedicado; retornamos token já usado no axios (se salvo)
      return { data: { session: null }, error: null };
    },
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } };
    },
  },
};

export { supabase };
