import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {updateFollowingList, loadProfileDetail, updateFollowingState} from '../actions/dispatchers';
import '../stylesheets/profile.styl';
import {UserLevel} from '../utils';

import {ProfileTagBox, ProfileCommentBox} from './boxes';
import Feed from './Feed';

const Profile = React.createClass({
  handleFollowChanged(following) {
    this.props.updateFollowingState(this.props.id, following);
  },

  componentWillMount() {
    this.props.loadProfileDetail(this.props.id);
  },

  componentWillReceiveProps(props) {
    // 프로필이 바뀌었을 때만 다시 로드
    if (props.id !== this.props.id) {
      this.props.loadProfileDetail(props.id);
    }
  },

  render() {
    const {id, userId, admin, name, description} = this.props;
    const mine = admin && userId === admin.id;
    const adminLink = mine ? (
      <Link to={`/profiles/${id}/admin`}>프로필 설정</Link>
    ) : (
      null
    );

    return (
      <div>
        <div className="profile-detail">
          <div className="profile-name">{name}</div>
          <div className="profile-desc">{description}</div>
          {adminLink}
        </div>
        <div id="profile-information">
          <FollowBox userLevel={this.props.userLevel} following={this.props.following} onFollowChanged={this.handleFollowChanged}/>
          <h3 id="profile-name">{this.props.name}</h3>
          <div id="profile-description">
            {this.props.description}
          </div>
          <ProfileTagBox profileId={id}/>
          <ProfileCommentBox profileId={id} isAddable/>
        </div>
        <Feed profileId={id}/>
      </div>
    );
  }
});

const FollowBox = React.createClass({
  handleFollow() {
    this.props.onFollowChanged(true);
  },

  handleUnfollow() {
    this.props.onFollowChanged(false);
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return this.props.following ? (
          <button id="follow-button" onClick={this.handleUnfollow}>팔로우 취소</button>
        ) : (
          <button id="follow-button" onClick={this.handleFollow}>팔로우</button>
        );

      default:
        return null;
    }
  }
});

const mapStateToProps = function (state) {
  const {following, name, description, admin} = state.profile.current;
  const {userLevel, userId} = state.userInfo;
  return {
    following,
    userLevel,
    name,
    description,
    admin,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    updateFollowingState: (id, following) => updateFollowingState(dispatch, id, following),
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
