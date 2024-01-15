'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { FormError } from '@/shared/ui/form-error';
import { FormSuccess } from '@/shared/ui/form-success';
import { signUp } from '@/features/authentication/sign-up.action';

export function SignUpForm(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');

  const onSubmit = (values: any) => {
    setSuccessMessage('');
    setErrorMessage('');

    signUp(values).then((data) => {
      setErrorMessage(data.error);
      setSuccessMessage(data.success);
    });
  };

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
}