import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { api } from '../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';


export const server = {
  guestForm: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.optional(z.string().email()),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      const convex = new ConvexHttpClient(import.meta.env.CONVEX_URL);
      await convex.mutation(api.guestbook.addGuestbookEntry, {
        name,
        email,
        message,
      });
    }
  })
}