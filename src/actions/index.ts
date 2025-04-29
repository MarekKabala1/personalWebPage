import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { api } from '../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

const MAX_PER_MINUTE = 10;

export const server = {
  guestForm: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.optional(z.string().email()),
      message: z.string(),
    }),
    handler: async ({ name, email, message }, { request }) => {
      const convex = new ConvexHttpClient(import.meta.env.CONVEX_URL);
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded
        ? forwarded.split(",")[0]
        : request.headers.get("x-real-ip") || "unknown";
      const alreadySigned = await convex.query(api.guestbook.hasAlreadySigned, { ip });

      if (alreadySigned) {
        throw new Error("You already signed the guestbook. Thank you!");
      }

      const { count } = await convex.query(api.guestbook.getRecentGuestbookEntries, { ip });
      if (count >= MAX_PER_MINUTE) {
        throw new Error("Too many submissions. Please wait 1 minute.");
      }
      await convex.mutation(api.guestbook.add, {
        name,
        email,
        message,
        ip
      });
    }
  })
}