-- Pedidos PIX gerados via Freepay
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  customer_name TEXT,
  customer_email TEXT,
  customer_document TEXT,
  items JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_transaction_id ON public.orders(transaction_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Leitura pública (necessário para o frontend fazer polling do status pelo transaction_id)
CREATE POLICY "Public can read orders by transaction_id"
ON public.orders FOR SELECT
USING (true);

-- Insert/Update somente backend (service role bypassa RLS, então não criamos policies)

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();