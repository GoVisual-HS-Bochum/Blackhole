package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.Termin;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Termin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TerminRepository extends JpaRepository<Termin, Long> {

}
