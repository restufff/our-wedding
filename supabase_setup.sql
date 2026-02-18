-- 1. Create the comments table
create table comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  message text not null,
  status text not null
);

-- 2. (Optional) Enable RLS if you want to restrict access later
-- alter table comments enable row level security;
