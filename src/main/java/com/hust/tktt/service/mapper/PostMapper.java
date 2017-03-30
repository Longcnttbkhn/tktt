package com.hust.tktt.service.mapper;

import com.hust.tktt.domain.*;
import com.hust.tktt.service.dto.PostDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Post and its DTO PostDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PostMapper {

    PostDTO postToPostDTO(Post post);

    List<PostDTO> postsToPostDTOs(List<Post> posts);

    Post postDTOToPost(PostDTO postDTO);

    List<Post> postDTOsToPosts(List<PostDTO> postDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Post postFromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
    

}
