package com.example.be.repository;

import com.example.be.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
  List<Todo> findAllByUserId(Long userId);
}
