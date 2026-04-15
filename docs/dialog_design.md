### 3.1 Code Example: The Perfect Dialog/Form

When refactoring a complex form or dialog, use this exact structure as your blueprint. Do not deviate from this pattern for standard CRUD operations.

**1. The Schema (`schemas/feature-schemas.ts`)**
```typescript
import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  roleId: z.string().min(1, "Role is required"),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

```

**2. The UI / Dumb Form (`ui/create-item-form.tsx`)**

```tsx
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateItemInput } from "../schemas/feature-schemas";

interface Props {
  form: UseFormReturn<CreateItemInput>;
  onSubmit: (values: CreateItemInput) => void;
  isLoading: boolean;
  roles: { id: string; name: string }[]; // Data passed from container
}

export function CreateItemForm({ form, onSubmit, isLoading, roles }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields go here, completely unaware of APIs or Dialogs */}
        <FormField 
          control={form.control} 
          name="name" 
          render={({ field }) => (
            <FormItem><FormControl><Input {...field} /></FormControl></FormItem>
          )} 
        />
        <Button type="submit" disabled={isLoading}>Save</Button>
      </form>
    </Form>
  );
}

```

**3. The Hook (`hooks/use-create-item.ts`)**

```typescript
import { toast } from "sonner";
import { api } from "@/trpc/react";

export function useCreateItem(onSuccessCallback: () => void) {
  const utils = api.useUtils();

  return api.item.create.useMutation({
    onSuccess: () => {
      utils.item.getAll.invalidate();
      toast.success("Item created successfully.");
      onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

```

**4. The Container / Glue (`containers/create-item-dialog.tsx`)**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";

import { createItemSchema, type CreateItemInput } from "../schemas/feature-schemas";
import { useCreateItem } from "../hooks/use-create-item";
import { CreateItemForm } from "../ui/create-item-form";

export function CreateItemDialog() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Fetch dropdown data
  const { data: roles } = api.role.getAll.useQuery();

  // 2. Initialize the mutation
  const mutation = useCreateItem(() => {
    setIsOpen(false);
    form.reset();
  });

  // 3. Initialize the form
  const form = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: { name: "", roleId: "" },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Add Item</DialogTrigger>
      <DialogContent>
        {/* 4. Pass everything down to the dumb UI */}
        <CreateItemForm 
          form={form} 
          onSubmit={mutation.mutate} 
          isLoading={mutation.isPending}
          roles={roles ?? []}
        />
      </DialogContent>
    </Dialog>
  );
}

```