<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public $table = "tasks";



    protected $fillable = [
        'is_completed',
        'title',
        'due_date',
        'user_id'
    ];
}
