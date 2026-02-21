-- 1. Create the comments table
create table comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  message text not null,
  status text not null
);

-- 2. Enable Row Level Security (RLS)
alter table comments enable row level security;

-- 3. Create policies
-- Allow anyone to read comments (public access)
create policy "Allow public read-only access"
  on comments for select
  using (true);

-- Allow anyone to insert comments (public access)
create policy "Allow public insert access"
  on comments for insert
  with check (true);

-- Do NOT allow updates or deletes from the public
-- (These will be restricted by default once RLS is enabled without specific policies)
