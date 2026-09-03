import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type FileType = 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other'
export type FileViewMode = 'grid' | 'list'

export interface FileFolder {
  id: string
  name: string
  parentId: string | null
  itemCount: number
  size: number
  createdAt: string
}

export interface FileItem {
  id: string
  name: string
  type: FileType
  extension: string
  size: number
  folderId: string | null
  url: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: string
  lastModified: string
}

export interface StorageStats {
  usedBytes: number
  totalBytes: number
  byType: Record<FileType, number>
}

export interface FileUploadPayload {
  name: string
  type: FileType
  extension: string
  size: number
  folderId: string | null
}

// ─── In-memory Mock Data ─────────────────────────────────────────────────────
const mockFolders: FileFolder[] = [
  {
    id: 'folder-01',
    name: 'Product Images',
    parentId: null,
    itemCount: 24,
    size: 48_000_000,
    createdAt: '2026-07-10T09:00:00Z',
  },
  {
    id: 'folder-02',
    name: 'Marketing Assets',
    parentId: null,
    itemCount: 18,
    size: 82_000_000,
    createdAt: '2026-07-14T11:30:00Z',
  },
  {
    id: 'folder-03',
    name: 'Documents & Reports',
    parentId: null,
    itemCount: 12,
    size: 15_000_000,
    createdAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'folder-04',
    name: 'Video Content',
    parentId: null,
    itemCount: 6,
    size: 540_000_000,
    createdAt: '2026-08-15T14:00:00Z',
  },
]

const mockFiles: FileItem[] = [
  {
    id: 'file-01',
    name: 'hero-banner.webp',
    type: 'image',
    extension: 'webp',
    size: 1_240_000,
    folderId: 'folder-01',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Alex Morgan',
    uploadedAt: '2026-08-20T09:00:00Z',
    lastModified: '2026-08-20T09:00:00Z',
  },
  {
    id: 'file-02',
    name: 'product-shot-01.jpg',
    type: 'image',
    extension: 'jpg',
    size: 980_000,
    folderId: 'folder-01',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2026-08-21T10:30:00Z',
    lastModified: '2026-08-21T10:30:00Z',
  },
  {
    id: 'file-03',
    name: 'product-shot-02.jpg',
    type: 'image',
    extension: 'jpg',
    size: 1_120_000,
    folderId: 'folder-01',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2026-08-21T11:00:00Z',
    lastModified: '2026-08-21T11:00:00Z',
  },
  {
    id: 'file-04',
    name: 'team-photo.jpg',
    type: 'image',
    extension: 'jpg',
    size: 2_300_000,
    folderId: 'folder-02',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Marcus Vance',
    uploadedAt: '2026-08-22T14:00:00Z',
    lastModified: '2026-08-22T14:00:00Z',
  },
  {
    id: 'file-05',
    name: 'brand-logo.svg',
    type: 'image',
    extension: 'svg',
    size: 42_000,
    folderId: 'folder-02',
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Elena Rostova',
    uploadedAt: '2026-08-23T09:30:00Z',
    lastModified: '2026-08-25T10:00:00Z',
  },
  {
    id: 'file-06',
    name: 'landscape-hero.jpg',
    type: 'image',
    extension: 'jpg',
    size: 3_100_000,
    folderId: 'folder-02',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=640&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=320&auto=format&fit=crop&q=60',
    uploadedBy: 'Alex Morgan',
    uploadedAt: '2026-08-24T13:00:00Z',
    lastModified: '2026-08-24T13:00:00Z',
  },
  {
    id: 'file-07',
    name: 'Q3-2026-Financial-Report.pdf',
    type: 'document',
    extension: 'pdf',
    size: 4_800_000,
    folderId: 'folder-03',
    url: '#',
    uploadedBy: 'Alex Morgan',
    uploadedAt: '2026-09-01T08:00:00Z',
    lastModified: '2026-09-01T08:00:00Z',
  },
  {
    id: 'file-08',
    name: 'System-Architecture-v2.docx',
    type: 'document',
    extension: 'docx',
    size: 1_200_000,
    folderId: 'folder-03',
    url: '#',
    uploadedBy: 'Marcus Vance',
    uploadedAt: '2026-09-02T10:00:00Z',
    lastModified: '2026-09-02T10:00:00Z',
  },
  {
    id: 'file-09',
    name: 'Sprint-Metrics-Aug.xlsx',
    type: 'document',
    extension: 'xlsx',
    size: 640_000,
    folderId: 'folder-03',
    url: '#',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2026-09-02T11:30:00Z',
    lastModified: '2026-09-02T11:30:00Z',
  },
  {
    id: 'file-10',
    name: 'product-launch-demo.mp4',
    type: 'video',
    extension: 'mp4',
    size: 258_000_000,
    folderId: 'folder-04',
    url: '#',
    uploadedBy: 'Elena Rostova',
    uploadedAt: '2026-08-28T09:00:00Z',
    lastModified: '2026-08-28T09:00:00Z',
  },
  {
    id: 'file-11',
    name: 'ui-walkthrough.mp4',
    type: 'video',
    extension: 'mp4',
    size: 142_000_000,
    folderId: 'folder-04',
    url: '#',
    uploadedBy: 'Alex Morgan',
    uploadedAt: '2026-08-30T15:00:00Z',
    lastModified: '2026-08-30T15:00:00Z',
  },
  {
    id: 'file-12',
    name: 'icons-pack.zip',
    type: 'archive',
    extension: 'zip',
    size: 18_000_000,
    folderId: null,
    url: '#',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2026-09-01T12:00:00Z',
    lastModified: '2026-09-01T12:00:00Z',
  },
]

export const fileManagerService = {
  async getFolders(): Promise<FileFolder[]> {
    // DEV short-circuit: skip network request entirely when no backend is available
    if (import.meta.env.DEV) return [...mockFolders]
    try {
      const res = await apiClient.get<ApiResponse<FileFolder[]> | FileFolder[]>('/files/folders')
      return Array.isArray(res) ? res : res.data
    } catch {
      throw new Error('Failed to load folders')
    }
  },

  async getFiles(folderId?: string | null): Promise<FileItem[]> {
    // DEV short-circuit: skip network request entirely when no backend is available
    if (import.meta.env.DEV) {
      if (folderId === undefined || folderId === null) return [...mockFiles]
      return mockFiles.filter(f => f.folderId === folderId)
    }
    try {
      const params = folderId ? { folderId } : {}
      const res = await apiClient.get<ApiResponse<FileItem[]> | FileItem[]>('/files', { params })
      return Array.isArray(res) ? res : res.data
    } catch {
      throw new Error('Failed to load files')
    }
  },

  async getStorageStats(): Promise<StorageStats> {
    // DEV short-circuit: skip network request entirely when no backend is available
    if (import.meta.env.DEV) {
      const byType = { image: 0, video: 0, document: 0, audio: 0, archive: 0, other: 0 }
      let usedBytes = 0
      mockFiles.forEach(f => {
        byType[f.type] = (byType[f.type] || 0) + f.size
        usedBytes += f.size
      })
      return {
        usedBytes,
        totalBytes: 1_000_000_000, // 1GB
        byType,
      }
    }
    try {
      return await apiClient.get<StorageStats>('/files/storage-stats')
    } catch {
      throw new Error('Failed to load storage stats')
    }
  },

  async uploadFile(payload: FileUploadPayload): Promise<FileItem> {
    if (import.meta.env.DEV) {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        ...payload,
        url: payload.type === 'image'
          ? `https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=640&auto=format&fit=crop&q=80`
          : '#',
        thumbnailUrl: payload.type === 'image'
          ? `https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=320&auto=format&fit=crop&q=60`
          : undefined,
        uploadedBy: 'Alex Morgan',
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }
      mockFiles.unshift(newFile)
      return newFile
    }
    try {
      return await apiClient.post<FileItem>('/files/upload', payload)
    } catch {
      throw new Error('Failed to upload file')
    }
  },

  async deleteFile(id: string): Promise<void> {
    if (import.meta.env.DEV) {
      const idx = mockFiles.findIndex(f => f.id === id)
      if (idx !== -1) mockFiles.splice(idx, 1)
      return
    }
    try {
      await apiClient.delete(`/files/${id}`)
    } catch {
      throw new Error('Failed to delete file')
    }
  },

  async createFolder(name: string, parentId: string | null = null): Promise<FileFolder> {
    if (import.meta.env.DEV) {
      const newFolder: FileFolder = {
        id: `folder-${Date.now()}`,
        name,
        parentId,
        itemCount: 0,
        size: 0,
        createdAt: new Date().toISOString(),
      }
      mockFolders.push(newFolder)
      return newFolder
    }
    try {
      return await apiClient.post<FileFolder>('/files/folders', { name, parentId })
    } catch {
      throw new Error('Failed to create folder')
    }
  },
}
