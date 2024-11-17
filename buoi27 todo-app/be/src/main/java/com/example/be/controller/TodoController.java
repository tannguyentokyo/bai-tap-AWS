package com.example.be.controller;

import com.example.be.dto.TodoDto;
import com.example.be.entity.Todo;
import com.example.be.repository.TodoRepository;
import com.example.be.repository.UserRepository;
import com.example.be.utils.S3FileUploadUtil;
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
    private final S3FileUploadUtil s3FileUploadUtil;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository, S3FileUploadUtil s3FileUploadUtil) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.s3FileUploadUtil = s3FileUploadUtil;
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
        todo.setTitle(dto.getTitle());
        todo.setCompleted(dto.isCompleted());
        todo.setThumbnail(s3FileUploadUtil.uploadImage(dto.getThumbnail()));

        return todoRepository.save(todo);
    }

    @PatchMapping("/todos/{id}")
    public Todo updateTodos(@PathVariable Long id, @RequestPart("title") String title,
                            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail) {
        Todo todo = todoRepository.findById(id).orElseThrow();
        todo.setTitle(title);
        if (thumbnail != null) {
            todo.setThumbnail(s3FileUploadUtil.uploadImage(thumbnail));
        }

        return todoRepository.save(todo);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodos(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
