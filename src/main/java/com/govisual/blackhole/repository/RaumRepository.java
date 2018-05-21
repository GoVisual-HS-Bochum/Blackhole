package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.Raum;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Raum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RaumRepository extends JpaRepository<Raum, Long> {

}
