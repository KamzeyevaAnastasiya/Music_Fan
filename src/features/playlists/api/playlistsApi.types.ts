import type { CurrentUserReaction } from '@/common/enums'
import type { Images, Tag, User } from '@/common/types'

export type PlaylistsResponse = {
  data: PlaylistData[]
  meta: PlaylistMeta
}

export type PlaylistData = {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}

export type PlaylistMeta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type PlaylistAttributes = {
  title: string
  addedAt: string
  updatedAt: string
  order: number
  dislikesCount: number
  likesCount: number
  tags: Tag[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
  tracksCount: number
  duration: number
  description?: string
}

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
  onlyLikedByMe?: boolean
}

export type CreatePlaylistArgs = {
  data: CreatePlaylistData
}

export type CreatePlaylistData = {
  type: 'playlists'
  attributes: CreatePlaylistAttributes
}

export type CreatePlaylistAttributes = {
  title: string
  description: string
}

export type UpdatePlaylistArgs = {
  data: UpdatePlaylistData
}

export type UpdatePlaylistData = {
  type: 'playlists'
  attributes: UpdatePlaylistAttributes
}

export type UpdatePlaylistAttributes = CreatePlaylistAttributes & {
  tagIds: string[]
}
