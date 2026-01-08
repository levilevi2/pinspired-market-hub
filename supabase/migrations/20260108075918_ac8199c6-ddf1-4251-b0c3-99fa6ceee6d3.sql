-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create scheduled flight lessons table
CREATE TABLE public.scheduled_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  instructor_id TEXT NOT NULL,
  instructor_name TEXT NOT NULL,
  lesson_date DATE NOT NULL,
  lesson_time TEXT NOT NULL,
  lesson_number INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  hours_approved BOOLEAN NOT NULL DEFAULT false,
  hours_count NUMERIC DEFAULT 1,
  notes TEXT,
  original_date DATE,
  original_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scheduled_lessons ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own lessons" 
ON public.scheduled_lessons 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lessons" 
ON public.scheduled_lessons 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lessons" 
ON public.scheduled_lessons 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lessons" 
ON public.scheduled_lessons 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scheduled_lessons_updated_at
BEFORE UPDATE ON public.scheduled_lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();