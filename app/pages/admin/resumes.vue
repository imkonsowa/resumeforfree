<template>
    <div class="space-y-6">
            <!-- Header -->
            <div>
                <p class="text-gray-600">
                    {{ $t('admin.resumes.description') }}
                </p>
            </div>

            <!-- Loading State -->
            <div
                v-if="loading"
                class="text-center py-12"
            >
                <p class="text-gray-500">
                    {{ $t('common.loading') }}
                </p>
            </div>

            <!-- Empty State -->
            <div
                v-else-if="resumes.length === 0"
                class="text-center py-12"
            >
                <FileText class="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p class="text-gray-500">
                    {{ $t('admin.resumes.noResumes') }}
                </p>
            </div>

            <!-- Resumes Table -->
            <Card v-else>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $t('admin.resumes.name') }}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $t('admin.resumes.owner') }}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $t('admin.resumes.createdAt') }}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $t('admin.resumes.updatedAt') }}
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $t('common.actions') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="resume in resumes"
                                    :key="resume.id"
                                >
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                                        {{ resume.name || 'Untitled Resume' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {{ resume.user_email || resume.user_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {{ formatDate(resume.created_at) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {{ formatDate(resume.updated_at) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            @click="openPreview(resume)"
                                        >
                                            <Eye class="w-4 h-4 mr-1" />
                                            {{ $t('admin.resumes.actions.view') }}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="confirmDelete(resume.id)"
                                        >
                                            {{ $t('common.delete') }}
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <!-- Preview Dialog -->
            <ResumePreviewDialog
                v-model="showPreview"
                :resume-id="previewResume?.id || ''"
                :resume-name="previewResume?.name || ''"
                :owner-email="previewResume?.user_email || ''"
            />
    </div>
</template>

<script lang="ts" setup>
import { FileText, Eye } from 'lucide-vue-next';
import ResumePreviewDialog from '~/components/admin/ResumePreviewDialog.vue';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { toast } from 'vue-sonner';

definePageMeta({
    middleware: 'admin',
    layout: 'admin',
});

const { t } = useI18n();

interface Resume {
    id: string;
    user_id: string;
    user_email?: string;
    name: string;
    template?: string;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
}

const resumes = ref<Resume[]>([]);
const loading = ref(true);
const showPreview = ref(false);
const previewResume = ref<Resume | null>(null);

const fetchResumes = async () => {
    loading.value = true;
    try {
        const data = await $fetch('/api/admin/resumes');
        resumes.value = data.resumes || [];
    }
    catch (error) {
        console.error('Error fetching resumes:', error);
        toast.error(t('admin.resumes.errors.fetchFailed'));
    }
    finally {
        loading.value = false;
    }
};

const openPreview = (resume: Resume) => {
    previewResume.value = resume;
    showPreview.value = true;
};

const confirmDelete = (resumeId: string) => {
    if (confirm(t('admin.resumes.confirmDelete'))) {
        deleteResume(resumeId);
    }
};

const deleteResume = async (resumeId: string) => {
    try {
        await $fetch(`/api/admin/resumes/${resumeId}`, {
            method: 'DELETE',
        });

        // Remove from local state
        resumes.value = resumes.value.filter(r => r.id !== resumeId);

        toast.success(t('admin.resumes.success.deleted'));
    }
    catch (error) {
        console.error('Error deleting resume:', error);
        toast.error(t('admin.resumes.errors.deleteFailed'));
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

onMounted(() => {
    fetchResumes();
});
</script>
