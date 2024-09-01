package com.example.be.controller;

import com.example.be.dto.TodoDto;
import com.example.be.entity.Todo;
import com.example.be.repository.TodoRepository;
import com.example.be.repository.UserRepository;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
@CrossOrigin(origins = "*")
public class TodoController {
  private final TodoRepository todoRepository;
  private final UserRepository userRepository;

  public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }

  @GetMapping("/todos/{userId}")
  public List<Todo> getTodos(
      @PathVariable("userId") Long userId,
      @RequestParam(value = "title", required = false, defaultValue = "") String title) {
    if (StringUtils.hasText(title)) {
      return todoRepository.findAllByUserId(userId)
          .stream()
          .filter(todo -> todo.getTitle().contains(title))
          .collect(Collectors.toList());
    }
    return todoRepository.findAllByUserId(userId);
  }

  @PostMapping("/todos")
  public Todo createTodos(@ModelAttribute TodoDto dto) {
    Todo todo = new Todo();
    todo.setUser(userRepository.findById(dto.getUserId()).get());
    todo.setTitle(dto.getTitle());
    todo.setCompleted(dto.isCompleted());

    return todoRepository.save(todo);
  }

  @PatchMapping("/todos/{id}")
  public Todo updateTodos(@PathVariable Long id, @RequestPart("title") String title) {
    Todo todo = todoRepository.findById(id).orElseThrow();
    todo.setTitle(title);

    return todoRepository.save(todo);
  }

  @DeleteMapping("/todos/{id}")
  public void deleteTodos(@PathVariable Long id) {
    todoRepository.deleteById(id);
  }
}
