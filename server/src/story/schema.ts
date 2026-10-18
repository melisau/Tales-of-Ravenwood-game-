import { z } from 'zod';
import { ANY_CLASS, CLASS_IDS } from '../../../shared/types';

const classIdSchema = z.enum(CLASS_IDS);

const outcomeSchema = z.object({
  text: z.string().min(1),
  hp_change: z.number().int().min(-10).max(10),
  next_node_id: z.string().min(1).nullable(),
  ending: z
    .object({ type: z.enum(['victory', 'bittersweet', 'defeat']), title: z.string().min(1) })
    .optional(),
});

export const storyActionSchema = z.object({
  action_id: z.string().regex(/^[a-z0-9_]+$/, 'action_id snake_case olmalı'),
  required_class: z.union([classIdSchema, z.literal(ANY_CLASS)]),
  button_text: z.string().min(1).max(80),
  dice_dc: z.number().int().min(5).max(20),
  success: outcomeSchema,
  fail: outcomeSchema,
});

export const storyNodeSchema = z
  .object({
    node_id: z.string().regex(/^[a-z0-9_]+$/, 'node_id snake_case olmalı'),
    title: z.string().min(1),
    public_text: z.string().min(1),
    class_hints: z.record(classIdSchema, z.string().min(1)),
    actions: z.array(storyActionSchema).min(1),
  })
  .superRefine((node, ctx) => {
    const ids = new Set<string>();
    for (const a of node.actions) {
      if (ids.has(a.action_id)) {
        ctx.addIssue({ code: 'custom', message: `Tekrarlanan action_id: ${a.action_id}` });
      }
      ids.add(a.action_id);
    }
    // Hangi sınıflar odada olursa olsun grup kilitlenmesin diye en az bir "ANY" aksiyon şart.
    if (!node.actions.some((a) => a.required_class === ANY_CLASS)) {
      ctx.addIssue({ code: 'custom', message: `${node.node_id}: en az bir required_class="ANY" aksiyonu olmalı` });
    }
  });

/** Bir dosya tek düğüm ya da düğüm dizisi içerebilir. */
export const storyFileSchema = z.union([storyNodeSchema, z.array(storyNodeSchema)]);
