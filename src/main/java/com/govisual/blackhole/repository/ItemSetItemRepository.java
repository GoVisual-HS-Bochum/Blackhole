package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.ItemSetItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ItemSetItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemSetItemRepository extends JpaRepository<ItemSetItem, Long> {

}
