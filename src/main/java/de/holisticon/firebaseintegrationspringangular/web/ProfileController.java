package de.holisticon.firebaseintegrationspringangular.web;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import de.holisticon.firebaseintegrationspringangular.dto.EloDeltaDto;
import de.holisticon.firebaseintegrationspringangular.dto.ProfileDataDto;
import de.holisticon.firebaseintegrationspringangular.model.UserProfile;
import de.holisticon.firebaseintegrationspringangular.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;

    @GetMapping()
    public ProfileDataDto getProfile(@AuthenticationPrincipal Jwt jwt) throws FirebaseAuthException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String uid = authentication.getName();

        UserProfile userProfile;
        Optional<UserProfile> knownUserProfile = userRepository.findById(uid);

        if (knownUserProfile.isEmpty()) {
            userProfile = createAndSaveNewUserProfile(uid);
        } else {
            userProfile = knownUserProfile.get();
        }

        // Explicit verification as follows. Probably is already verified by Spring Security Chain.
        FirebaseToken verifiedFirebaseToken = FirebaseAuth.getInstance().verifyIdToken(jwt.getTokenValue());

        return new ProfileDataDto(userProfile);
    }

    private UserProfile createAndSaveNewUserProfile(String uid) throws FirebaseAuthException {
        String username = FirebaseAuth.getInstance().getUser(uid).getDisplayName();

        // We do not ask for custom username yet, so we just use the name from the token or set a generic one.
        if (username == null || username.equals("")) {
            username = "Anonymous";
        }

        UserProfile newProfile = new UserProfile(uid, username, 1000);
        return userRepository.save(newProfile);
    }

    @PutMapping(value = "elo")
    public ProfileDataDto addElo(@RequestBody EloDeltaDto eloDeltaDto) {
        String uid  = SecurityContextHolder.getContext().getAuthentication().getName();

        UserProfile knownUserProfile = userRepository.findById(uid).orElseThrow();
        knownUserProfile.setElo(knownUserProfile.getElo() + eloDeltaDto.getDelta());

        return new ProfileDataDto(userRepository.save(knownUserProfile));
    }
}
