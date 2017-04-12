package com.hust.tktt.repository;

import com.hust.tktt.domain.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Post entity.
 */
@SuppressWarnings("unused")
public interface PostRepository extends JpaRepository<Post,Long> {
	Page<Post> findAllByTitleContaining(Pageable pageable, String query);
}
