package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.Groesse;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Groesse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroesseRepository extends JpaRepository<Groesse, Long> {

}
