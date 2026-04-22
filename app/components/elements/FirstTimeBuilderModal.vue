<template>
    <Dialog
        :open="isOpen"
        @update:open="$emit('close')"
    >
        <DialogContent class="max-w-[95vw] sm:max-w-md mx-4 sm:mx-auto">
            <DialogHeader class="pb-2">
                <DialogTitle class="flex items-center gap-2 text-lg">
                    <Cloud class="w-5 h-5 text-green-700" />
                    <span>{{ $t('resumes.modals.firstTime.title') }}</span>
                </DialogTitle>
                <DialogDescription class="text-sm leading-relaxed pt-1">
                    {{ $t('resumes.modals.firstTime.description') }}
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-3 py-3">
                <ul class="text-sm text-muted-foreground space-y-1.5">
                    <li class="flex items-center gap-2">
                        <Check class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.accessAnywhere') }}</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <Check class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.autoBackup') }}</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <Check class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.freeResumes') }}</span>
                    </li>
                </ul>
            </div>
            <DialogFooter class="!flex-col space-y-3 pt-2">
                <div class="flex gap-2 w-full">
                    <Button
                        class="flex-1"
                        @click="$emit('register', dontShowAgain)"
                    >
                        <UserPlus class="w-4 h-4 me-1.5" />
                        {{ $t('resumes.modals.firstTime.signUp') }}
                    </Button>
                    <Button
                        variant="outline"
                        class="flex-1"
                        @click="$emit('login', dontShowAgain)"
                    >
                        <LogIn class="w-4 h-4 me-1.5" />
                        {{ $t('resumes.modals.firstTime.login') }}
                    </Button>
                </div>
                <Button
                    variant="outline"
                    class="w-full"
                    @click="$emit('continueLocally', dontShowAgain)"
                >
                    {{ $t('resumes.modals.firstTime.continueLocally') }}
                </Button>
                <div class="flex items-center justify-center gap-2 pt-1">
                    <Checkbox
                        id="dont-show-again"
                        v-model="dontShowAgain"
                    />
                    <Label
                        for="dont-show-again"
                        class="text-xs text-muted-foreground cursor-pointer"
                    >
                        {{ $t('resumes.modals.firstTime.dontShowAgain') }}
                    </Label>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import {
    Check,
    Cloud,
    LogIn,
    UserPlus,
} from 'lucide-vue-next';

interface Props {
    isOpen: boolean;
}
const props = defineProps<Props>();
defineEmits<{
    close: [];
    register: [dontShowAgain: boolean];
    login: [dontShowAgain: boolean];
    continueLocally: [dontShowAgain: boolean];
}>();
const dontShowAgain = ref(false);
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        dontShowAgain.value = false;
    }
});
</script>
