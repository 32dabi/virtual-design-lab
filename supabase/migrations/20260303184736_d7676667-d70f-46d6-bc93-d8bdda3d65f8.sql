
INSERT INTO storage.buckets (id, name, public)
VALUES ('room-renders', 'room-renders', true);

CREATE POLICY "Allow public read access on room-renders"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'room-renders');

CREATE POLICY "Allow service role insert on room-renders"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'room-renders');
