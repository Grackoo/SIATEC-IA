-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Inventory Table
create table inventory (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text check (category in ('laptop', 'software', 'streaming')) not null,
  price numeric not null default 0,
  stock integer default 0,
  specs jsonb default '{}'::jsonb,
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create Sales Table
create table sales (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid references inventory(id),
  quantity integer default 1,
  total_amount numeric not null,
  customer_contact text,
  sale_date timestamp with time zone default now()
);

-- Create Storage Bucket for Product Images
insert into storage.buckets (id, name, public) 
values ('products', 'products', true);

-- Policy to allow public read access to products
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Policy to allow authenticated uploads (for admin)
create policy "Admin Upload"
  on storage.objects for insert
  with check ( bucket_id = 'products' );
