package de.holisticon.firebaseintegrationspringangular.repository;

import de.holisticon.firebaseintegrationspringangular.model.UserProfile;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserProfile, String> {

}
