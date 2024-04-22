import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const subscriptionTypeEnum = pgEnum("subscription_type", ["free", "premium", "student"])
export const isVerifiedEnum = pgEnum("is_verified", ["true", "false"])
export const isPublicEnum = pgEnum("is_public", ["true", "false"])



// user related tables
export const UserTable = pgTable("Users", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    username: varchar("username").notNull().unique(),
    password: varchar("password").notNull(),
    email: varchar("email").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    subscriptionType: subscriptionTypeEnum("subscription_type").notNull().default("free"),
    subscriptionExpirationDate: timestamp("subscription_expiration_date").notNull().defaultNow(),
    isVerified: isVerifiedEnum('is_verified').notNull().default("false"),
});

export const PlaylistTable = pgTable("Playlists", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    name: varchar("name").notNull().unique(),
    userId: uuid("user_id").notNull().references(() => UserTable.id),
    timeLastSongAdded: timestamp("time_last_song_added").notNull().$onUpdate(() => new Date()),
});

export const LibraryTable = pgTable("Library", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => UserTable.id),
    songId: uuid("song_id").notNull().references(() => SongTable.id),
    albumId: uuid("album_id").notNull().references(() => AlbumTable.id),
    artistId: uuid("artist_id").notNull().references(() => ArtistTable.id),
    playlistId: uuid("playlist_id").notNull().references(() => PlaylistTable.id),
});

export const UserVerificationTable = pgTable("User_Verification", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => UserTable.id),
    verificationCode: varchar("verification_code").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const FollowersTable = pgTable("Followers", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => UserTable.id),
    followerId: uuid("follower_id").notNull().references(() => UserTable.id),
});

//TODO: think about how to implement ab subscription table


// music related tables
export const GenreTable = pgTable("Genres", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    name: varchar("name").notNull().unique(),
});

export const ArtistTable = pgTable("Artists", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    name: varchar("name").notNull().unique(),
    bio: varchar("bio"),
    genreId: uuid("genre_id").notNull().references(() => GenreTable.id),
});

export const AlbumTable = pgTable("Albums", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    name: varchar("name").notNull().unique(),
    releaseDate: timestamp("release_date").notNull(),
    artistId: uuid("artist_id").notNull().references(() => ArtistTable.id),
});

export const SongTable = pgTable("Songs", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    name: varchar("name").notNull().unique(),
    duration: varchar("duration").notNull(),
    albumId: uuid("album_id").notNull().references(() => AlbumTable.id),
});

// algorithm related tables

export const UserPreferenceTable = pgTable("User_Preferences", {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => UserTable.id),
    genreId: uuid("genre_id").notNull().references(() => GenreTable.id),
    weight: varchar("weight").notNull(),
});
