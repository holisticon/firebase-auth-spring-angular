package de.holisticon.firebaseintegrationspringangular.web;

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
    public ProfileDataDto getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String uid = authentication.getName();

        return new ProfileDataDto(uid, "Fetzig!");
    }
}
