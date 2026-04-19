-- Permitir leitura pública dos pedidos para o painel admin (autenticação client-side)
CREATE POLICY "Public can read orders"
ON public.orders
FOR SELECT
TO public
USING (true);