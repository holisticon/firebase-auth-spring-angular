package de.holisticon.firebaseintegrationspringangular.dto;

import de.holisticon.firebaseintegrationspringangular.model.UserProfile;
import lombok.Data;

@Data
public class ProfileDataDto {
    private final String nickname;
    private final int elo;

    public ProfileDataDto(UserProfile userProfile) {
        nickname = userProfile.getNickname();
        elo = userProfile.getElo();
    }
}
