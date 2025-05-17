
import { useAuth } from '@/context/authContext';
import { FollowServiceProps, followUser, getFollow, unfollowUser } from '@/services/interaction/followService';
import { SharedButtonProps } from '@/types/SharedButtonProps';

class FollowButtonViewModel {
  private _userId: string = useAuth().user!.userId;
  private _userToFollowId: string;
  private _isFollowing: boolean = false;

  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userToFollowId: string) {
    this._userToFollowId = userToFollowId;
  }

  get loading(): boolean {
    return this._loading;
  }

  setLoading(value: boolean) {
    this._loading = value;
  }

  get error(): string | null {
    return this._error;
  }

  setError(value: string | null) {
    this._error = value;
  }

  private getFollowProps() {
    const follow: FollowServiceProps = {
      userId: this._userId,
      userToFollowId: this._userToFollowId,
    };
    return follow;
  }

  async handlePress(): Promise<void> {
    this._loading = true;
  
    const action = this._isFollowing ? unfollowUser : followUser;
    const actionType = this._isFollowing ? 'unfollow' : 'follow';
    const errorMessage = `Failed to ${actionType}.`;
  
    try {
      const result = await action(this.getFollowProps());
      if (result) {
        this._isFollowing = !this._isFollowing;
      }
    } catch (err) {
      this._error = errorMessage;
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchFollowData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      if (!this._isFollowing) {
        const follow = await getFollow(this.getFollowProps());
        if (follow) {
          this._isFollowing = true
        }
      }
    } catch (err) {
      this._error = 'Failed to load follow.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  get buttonState(): SharedButtonProps{
    return {
      text: this._isFollowing ? 'following' : 'follow',
      icon: 'personAdd',
      pending: false,
      iconFill: 'personFillCheck',
      onPress: async () => await this.handlePress(), 
      isSelected: this._isFollowing,
      isIconButton: false
    };
  }
}

export default FollowButtonViewModel;