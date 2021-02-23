package de.holisticon.firebaseintegrationspringangular.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {
    @GetMapping(value = "profile")
    public ProfileDataDto getProfile() {
        return new ProfileDataDto("Fetzig!");
    }
}
