package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.PositionRaum;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PositionRaum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PositionRaumRepository extends JpaRepository<PositionRaum, Long> {

}
