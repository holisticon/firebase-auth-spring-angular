package de.holisticon.firebaseintegrationspringangular.web;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import de.holisticon.firebaseintegrationspringangular.dto.ProfileDataDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {
    @GetMapping(value = "profile")
    public ProfileDataDto getProfile() throws FirebaseAuthException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String uid = authentication.getName();
        String username = FirebaseAuth.getInstance().getUser(uid).getDisplayName();

        return new ProfileDataDto(uid, username);
    }
}
