package com.govisual.blackhole.repository;

import com.govisual.blackhole.domain.ItemSet_item;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ItemSet_item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemSet_itemRepository extends JpaRepository<ItemSet_item, Long> {

}
