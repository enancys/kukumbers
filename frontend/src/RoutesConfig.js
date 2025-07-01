import UserPage from './pages/admin/users/UsersPage';
import CommentsPage from './pages/admin/comments/CommentsPage';
import GamesPage from './pages/admin/games/GamesPage';
import GameScreenshotPage from './pages/admin/gameScreenshots/GameScreenshotPage';
import GameTagPage from './pages/admin/gameTags/GameTagPage';
import GameVideoPage from './pages/admin/gameVideos/GameVideoPage ';
import ReviewPage from './pages/admin/reviews/ReviewPage';
import TagsPage from './pages/admin/tags/TagPage';
import UserGameLibraryPage from './pages/admin/userGameLibrary/UserGameLibraryPage';
import UserWishlistPage from './pages/admin/userWishlist/UserWishlistPage';


const RoutesConfig = [
    { path: "user", component: UserPage.UserIndex },
    { path: "user/create", component: UserPage.UserCreate },
    { path: "user/update/:id", component: UserPage.UserUpdate },

    { path: "comments", component: CommentsPage.CommentIndex },
    { path: "comments/create", component: CommentsPage.CommentCreate },
    { path: "comments/update/:id", component: CommentsPage.CommentUpdate },

    { path: "games", component: GamesPage.GamesIndex },
    { path: "games/create", component: GamesPage.GamesCreate },
    { path: "games/update/:id", component: GamesPage.GamesUpdate },

    { path: "game_screenshots", component: GameScreenshotPage.GameScreenshotIndex },
    { path: "game_screenshots/create", component: GameScreenshotPage.GameScreenshotCreate },
    { path: "game_screenshots/update/:id", component: GameScreenshotPage.GameScreenshotUpdate },

    { path: "game_tags", component: GameTagPage.GameTagIndex },
    { path: "game_tags/create", component: GameTagPage.GameTagCreate },
    { path: "game_tags/update/:id", component: GameTagPage.GameTagUpdate },

    { path: "game_videos", component: GameVideoPage.GameVideoIndex },
    { path: "game_videos/create", component: GameVideoPage.GameVideoCreate },
    { path: "game_videos/update/:id", component: GameVideoPage.GameVideoUpdate },

    { path: "reviews", component: ReviewPage.ReviewIndex },
    { path: "reviews/create", component: ReviewPage.ReviewCreate },
    { path: "reviews/update/:id", component: ReviewPage.ReviewUpdate },

    { path: "tags", component: TagsPage.TagIndex },
    { path: "tags/create", component: TagsPage.TagCreate },
    { path: "tags/update/:id", component: TagsPage.TagUpdate },

    { path: "user_game_library", component: UserGameLibraryPage.UserGameLibraryIndex },
    { path: "user_game_library/create", component: UserGameLibraryPage.UserGameLibraryCreate },
    { path: "user_game_library/update/:id", component: UserGameLibraryPage.UserGameLibraryUpdate },

    { path: "user_wishlists", component: UserWishlistPage.UserWishlistIndex },
    { path: "user_wishlists/create", component: UserWishlistPage.UserWishlistCreate },
    { path: "user_wishlists/update/:id", component: UserWishlistPage.UserWishlistUpdate },

];

export default RoutesConfig;
