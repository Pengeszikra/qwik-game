import { $, component$ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, zodForm$ } from '@modular-forms/qwik';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .email('The email address is badly formatted.'),
  password: z
    .string()
    .min(1, 'Please enter your password.')
    .min(8, 'You password must have 8 characters or more.'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}));
 
export const useFormAction = formAction$<LoginForm>((values) => {
  console.log(values)
}, zodForm$(loginSchema));

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(loginSchema),
  });

  console.log(loginForm);
 
  const handleSubmit = $<SubmitHandler<LoginForm>>((values, event) => {
    // Runs on client
    console.log(values, event);
  });

  return (
    <main class="grid place-items-center min-h-screen">
      <section class="grid gap-2 justify-start">
        <h1 class="text-[1.7em]"><span class="text-blue-400">Qwick </span>
        is the new 
        <span class="text-white"> solution?</span>
        </h1>
        <p>create </p>
        <span class="bg-neutral-700 p-2 rounded">pnpm create qwick@lates</span>
        <p>add tailwind</p>
        <span class="bg-neutral-700 p-2 rounded">pnpm qwik add tailwind</span>
        <p>
          The theme switching is really easy with this app
          <br />
          just need to edit the <span class="bg-neutral-700 rounded">root.tsx</span>
        </p>
        <p></p>
    <Form onSubmit$={handleSubmit} class="grid gap-2 items-end w-auto">
      <Field name="email">
        {(field, props) => (
          <label>
            name: <input class="p-2" {...props} type="email" value={field.value} />
            {field.error && <div class="text-orange-400">{field.error}</div>}
          </label>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <label>
            password: <input class="p-2" {...props} type="password" value={field.value} />
            {field.error && <div class="text-orange-400">{field.error}</div>}
          </label>
        )}
      </Field>
      <button type="submit" class="bg-blue-500 text-white rounded p-2">Login</button>
    </Form>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik looks react replacer",
  meta: [
    {
      name: "description",
      content: "Qwik game test page",
    },
  ],
};