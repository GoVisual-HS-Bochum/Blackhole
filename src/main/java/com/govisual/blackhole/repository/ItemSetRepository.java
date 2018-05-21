package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.ItemSet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ItemSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemSetRepository extends JpaRepository<ItemSet, Long> {

}
