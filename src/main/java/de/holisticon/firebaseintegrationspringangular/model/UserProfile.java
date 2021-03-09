package de.holisticon.firebaseintegrationspringangular.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    @Id
    private String id;
    private String nickname;
    private int elo;
}
