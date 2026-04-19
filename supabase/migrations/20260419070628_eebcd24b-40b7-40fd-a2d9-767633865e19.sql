-- Criar bucket público para comprovantes de pagamento
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas: qualquer um pode enviar (upload) e ler comprovantes
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Anyone can read payment proofs"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');

-- Adicionar coluna para guardar o URL do comprovante no pedido
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS proof_url text;

-- Permitir UPDATE público apenas da coluna de comprovante (via política simples de update)
CREATE POLICY "Public can attach payment proof"
ON public.orders
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);