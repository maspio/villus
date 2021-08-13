import { SetupContext } from '@nuxtjs/composition-api';

export function normalizeChildren(context: SetupContext, slotProps: any) {
  if (!context.slots.default) {
    return [];
  }

  return context.slots.default(slotProps) || [];
}
